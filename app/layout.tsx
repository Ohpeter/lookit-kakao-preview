import "./../styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "루킷 카카오 챗봇 미리보기 & 수익 시뮬레이터",
  description: "병원 대상 NIPT 수익 계산 및 카카오 챗봇 플로우 데모",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-neutral-50">{children}</body>
    </html>
  );
}
