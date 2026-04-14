import { ImageResponse } from "next/og";

export const alt = "Kalissea";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function OpenGraphImage({ params }: Props) {
  const { locale } = await params;
  const isFrench = locale === "fr";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "56px",
          background:
            "radial-gradient(circle at top left, rgba(208,255,227,0.18), transparent 34%), linear-gradient(135deg, #050505 0%, #0c0f0d 48%, #141917 100%)",
          color: "#f6f8f6",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: "32px",
            padding: "56px",
            background: "rgba(8, 10, 9, 0.68)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.34)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-120px",
              right: "-80px",
              width: "340px",
              height: "340px",
              borderRadius: "999px",
              background:
                "radial-gradient(circle, rgba(191,255,221,0.35) 0%, rgba(191,255,221,0.06) 44%, transparent 72%)",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
              zIndex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                color: "rgba(246,248,246,0.8)",
                fontSize: 28,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "999px",
                  backgroundColor: "#d0ffe3",
                }}
              />
              Kalissea
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                maxWidth: "800px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 72,
                  lineHeight: 1.02,
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                }}
              >
                {isFrench
                  ? "Studio digital indépendant pour petites entreprises ambitieuses."
                  : "Independent digital studio for ambitious small businesses."}
              </div>
              <div
                style={{
                  display: "flex",
                  maxWidth: "720px",
                  fontSize: 30,
                  lineHeight: 1.35,
                  color: "rgba(246,248,246,0.78)",
                }}
              >
                {isFrench
                  ? "Sites web, e-commerce et outils numériques sur mesure, pensés avec exigence et réalisés avec soin."
                  : "Websites, e-commerce, and custom digital tools designed with care and built with precision."}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "rgba(246,248,246,0.66)",
                fontSize: 24,
              }}
            >
              <div style={{ display: "flex" }}>
                {isFrench
                  ? "kalissea.com"
                  : "kalissea.com"}
              </div>
              <div style={{ display: "flex" }}>
                {isFrench
                  ? "Websites • E-commerce • Outils sur mesure"
                  : "Websites • E-commerce • Custom tools"}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
