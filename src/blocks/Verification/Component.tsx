import React from "react";
import { ShieldCheck } from "lucide-react";

import type { VerificationBlock as VerificationBlockProps } from "@/payload-types";
import type { Media as MediaType } from "@/payload-types";

import RichText from "@/components/RichText";
import { Media } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/utilities/ui";

export const VerificationBlock: React.FC<VerificationBlockProps> = (props) => {
  const {
    badge,
    heading,
    statement,
    registrationNumber,
    registeredDate,
    verifyUrl,
    qrImage,
  } = props;

  const hasQr = Boolean(qrImage && typeof qrImage === "object");
  const showProof = hasQr || Boolean(verifyUrl);

  return (
    <div className="w-full py-20 lg:py-28">
      <div className="container mx-auto">
        <Reveal className="rounded-2xl border border-hairline bg-card p-8 lg:p-12 surface-highlight">
          <div
            className={cn(
              "grid gap-10 lg:items-center",
              showProof && "lg:grid-cols-[1fr_auto] lg:gap-20",
            )}
          >
            <div className="flex flex-col gap-5">
              {badge && (
                <span className="font-mono text-[11px] font-medium text-muted-foreground">
                  {badge}
                </span>
              )}
              {heading && (
                <h4 className="text-4xl md:text-6xl font-normal tracking-[-0.03em] leading-[1.05] text-balance max-w-3xl">
                  {heading}
                </h4>
              )}
              {statement && (
                <RichText
                  className="mx-0 max-w-[68ch]"
                  data={statement}
                  enableGutter={false}
                />
              )}
              {(registeredDate || registrationNumber) && (
                <dl className="mt-2 grid gap-4 sm:grid-cols-2">
                  {registeredDate && (
                    <div className="rounded-xl border border-hairline bg-wash p-4">
                      <dt className="font-mono text-[11px] text-muted-foreground">
                        Registered
                      </dt>
                      <dd className="mt-2 font-mono text-base tabular-nums">
                        {registeredDate}
                      </dd>
                    </div>
                  )}
                  {registrationNumber && (
                    <div className="rounded-xl border border-hairline bg-wash p-4">
                      <dt className="font-mono text-[11px] text-muted-foreground">
                        Registration number
                      </dt>
                      <dd className="mt-2 font-mono text-base tabular-nums">
                        {registrationNumber}
                      </dd>
                    </div>
                  )}
                </dl>
              )}
            </div>

            {showProof && (
              <div className="flex flex-col items-center gap-4">
                {qrImage &&
                  typeof qrImage === "object" &&
                  (verifyUrl ? (
                    <a
                      className="block size-40 rounded-2xl border border-hairline bg-wash p-2 transition-[border-color,transform] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-hairline-strong hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      href={verifyUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Media
                        resource={qrImage as MediaType}
                        imgClassName="size-full object-contain"
                      />
                    </a>
                  ) : (
                    <div className="size-40 rounded-2xl border border-hairline bg-wash p-2">
                      <Media
                        resource={qrImage as MediaType}
                        imgClassName="size-full object-contain"
                      />
                    </div>
                  ))}
                {!hasQr && verifyUrl ? (
                  <a
                    className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    href={verifyUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <ShieldCheck className="size-6 text-muted-foreground" />
                  </a>
                ) : (
                  <ShieldCheck className="size-6 text-muted-foreground" />
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
};
