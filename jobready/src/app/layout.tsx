import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JobReady.bg — AI Кариерни Документи | CV, Мотивационно Писмо, LinkedIn",
  description:
    "Оптимизирайте CV-то си за ATS системи, генерирайте мотивационно писмо и LinkedIn профил с AI. Бързо, достъпно, професионално.",
  keywords: "CV оптимизация, ATS, мотивационно писмо, LinkedIn, работа в чужбина, България",
  openGraph: {
    title: "JobReady.bg — AI Кариерни Документи",
    description: "Оптимизирайте CV-то си за работа в Европа с изкуствен интелект.",
    type: "website",
    locale: "bg_BG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
