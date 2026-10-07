"use client";

import { useEffect, useState } from "react";
import { Award, Download, Printer, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

export interface CertificateItem {
  id: string;
  serial: string;
  title: string;
  kind: string;
  description: string;
  earnedAt: string;
  studentId: string;
  studentName: string;
}

const KIND_EMOJI: Record<string, string> = {
  lesson: "📖",
  assignment: "✅",
  streak: "🔥",
  level: "⭐",
  custom: "🏆",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
}

/** Full-screen print-ready certificate with a decorative border. */
function CertificatePrintOverlay({
  cert,
  studentName,
  onClose,
}: {
  cert: CertificateItem;
  studentName: string;
  onClose: () => void;
}) {
  // Give the dialog a beat to paint (and the logo to load) before printing.
  useEffect(() => {
    const t = setTimeout(() => window.print(), 400);
    return () => clearTimeout(t);
  }, []);

  const name = studentName || cert.studentName;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate: ${cert.title}`}
    >
      {/* Self-contained print CSS: only the certificate is printed, landscape. */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #bm-cert-print, #bm-cert-print * { visibility: visible !important; }
          #bm-cert-print {
            position: fixed !important;
            inset: 0 !important;
            margin: 0 !important;
            max-height: none !important;
            box-shadow: none !important;
          }
          @page { size: A4 landscape; margin: 10mm; }
        }
      `}</style>

      <div className="flex w-full max-w-3xl flex-col items-center gap-3">
        <div
          id="bm-cert-print"
          className="w-full rounded-2xl p-2 shadow-2xl"
          style={{ backgroundColor: "#f3e7c9", border: "6px solid #b8860b" }}
        >
          <div
            className="rounded-xl px-6 py-8 text-center sm:px-10 sm:py-12"
            style={{
              backgroundColor: "#fffdf6",
              border: "3px dashed #c9a54c",
              color: "#4a3f28",
            }}
          >
            <img
              src="/logo.png"
              alt="BrightMinds"
              className="mx-auto h-14 w-auto sm:h-16"
            />
            <p className="mt-3 text-xs font-semibold tracking-[0.25em] uppercase opacity-70">
              BrightMinds · Certificate of Achievement
            </p>
            <p className="mt-5 text-sm opacity-80">Proudly awarded to</p>
            <p className="font-display mt-1 text-3xl font-bold sm:text-4xl">{name}</p>
            <div className="mx-auto mt-4 flex max-w-md items-center gap-3" aria-hidden="true">
              <span className="h-0.5 flex-1" style={{ backgroundColor: "#c9a54c" }} />
              <span className="text-xl">🏆</span>
              <span className="h-0.5 flex-1" style={{ backgroundColor: "#c9a54c" }} />
            </div>
            <p className="mt-4 text-sm opacity-80">for outstanding effort in</p>
            <p className="font-display mt-1 text-2xl font-semibold sm:text-3xl">
              {KIND_EMOJI[cert.kind] ?? "🏅"} {cert.title}
            </p>
            {cert.description && (
              <p className="mx-auto mt-3 max-w-md text-sm opacity-75">{cert.description}</p>
            )}
            <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs sm:flex-row sm:text-sm">
              <div>
                <p className="font-semibold">{formatDate(cert.earnedAt)}</p>
                <p className="opacity-60">Date earned</p>
              </div>
              <div className="text-center sm:text-right">
                <p className="font-mono font-semibold">{cert.serial}</p>
                <p className="opacity-60">Certificate serial</p>
              </div>
            </div>
          </div>
        </div>

        <div className="no-print flex items-center gap-3">
          <Button
            onClick={() => window.print()}
            className="min-h-11 rounded-full px-6 font-semibold"
          >
            <Printer className="mr-2 h-4 w-4" aria-hidden="true" />
            Print / Save PDF
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="min-h-11 rounded-full bg-white/90 px-6 font-semibold"
          >
            <X className="mr-2 h-4 w-4" aria-hidden="true" />
            Close
          </Button>
        </div>
        <p className="no-print text-center text-xs text-white/80">
          Tip: choose <strong>Landscape</strong> in the print dialog for the best fit 📐
        </p>
      </div>
    </div>
  );
}

/**
 * Student's earned certificates: playful grid + print-ready download.
 * Only real, earned certificates are shown — honest empty state otherwise.
 */
export function CertificatesPanel({
  studentId,
  studentName,
  className,
}: {
  studentId: string;
  studentName?: string;
  className?: string;
}) {
  const [certs, setCerts] = useState<CertificateItem[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [printing, setPrinting] = useState<CertificateItem | null>(null);

  useEffect(() => {
    let alive = true;
    api<{ certificates: CertificateItem[] }>(
      `/api/certificates?studentId=${encodeURIComponent(studentId)}`
    )
      .then((data) => {
        if (!alive) return;
        setCerts(data.certificates);
        setFailed(false);
      })
      .catch(() => {
        if (!alive) return;
        setFailed(true);
        setCerts([]);
      });
    return () => {
      alive = false;
    };
  }, [studentId]);

  return (
    <section className={cn("space-y-4", className)} aria-labelledby="certificates-heading">
      <div className="flex items-center gap-2">
        <Award className="h-6 w-6 text-amber-500" aria-hidden="true" />
        <h2 id="certificates-heading" className="font-display text-xl font-semibold sm:text-2xl">
          My Certificates
        </h2>
        {certs && certs.length > 0 && (
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-sm font-bold text-amber-700">
            {certs.length}
          </span>
        )}
      </div>

      {certs === null && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-40 rounded-3xl" />
          ))}
        </div>
      )}

      {certs !== null && certs.length === 0 && (
        <div className="rounded-3xl border-2 border-dashed border-amber-300 bg-amber-50/60 p-8 text-center">
          <p className="font-display text-lg font-semibold text-amber-700">
            No certificates yet — complete assignments to earn your first! 🏆
          </p>
          {failed && <p className="mt-1 text-sm text-amber-600">(Couldn&apos;t reach the server just now.)</p>}
        </div>
      )}

      {certs !== null && certs.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((cert) => (
            <article
              key={cert.id}
              className="flex flex-col rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 via-white to-violet-50 p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-2xl"
                  aria-hidden="true"
                >
                  {KIND_EMOJI[cert.kind] ?? "🏅"}
                </span>
                <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-bold text-violet-700 capitalize">
                  {cert.kind}
                </span>
              </div>
              <h3 className="font-display mt-3 text-lg leading-snug font-semibold">{cert.title}</h3>
              {cert.description && (
                <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">{cert.description}</p>
              )}
              <p className="text-muted-foreground mt-2 text-xs">
                Earned {formatDate(cert.earnedAt)}
              </p>
              <p className="text-muted-foreground/80 mt-0.5 font-mono text-xs">{cert.serial}</p>
              <Button
                onClick={() => setPrinting(cert)}
                variant="outline"
                className="mt-3 min-h-11 rounded-full border-amber-300 font-semibold text-amber-700 hover:bg-amber-100"
              >
                <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                Download
              </Button>
            </article>
          ))}
        </div>
      )}

      {printing && (
        <CertificatePrintOverlay
          cert={printing}
          studentName={studentName ?? printing.studentName}
          onClose={() => setPrinting(null)}
        />
      )}
    </section>
  );
}
