import Link from 'next/link'
"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BOT = {
  project: "루킷 NIPT 카카오 채널",
  variables: {
    SIMULATOR_URL: "/simulator",
    ONBOARD_URL: "https://lookit-hospital.com/onboard",
    PICKUP_URL: "https://lookit-hospital.com/pickup",
    RESOURCES_URL: "https://lookit-hospital.com/resources",
    MANAGER_PHONE: "010-0000-0000",
  },
  entry_block: "MAIN_MENU",
  blocks: [
    {
      id: "MAIN_MENU",
      name: "메인 메뉴",
      utterances: ["시작","메뉴","안내","루킷","hello","hi"],
      response: {
        text: "안녕하세요! 루킷 NIPT 파트너 채널입니다 😊\n원하시는 항목을 선택해주세요.",
        quickReplies: [
          { label: "🧬 검사안내", blockId: "ABOUT_TEST" },
          { label: "💰 병원 수익계산", blockId: "ROI_CALC" },
          { label: "🏥 병원 등록", blockId: "HOSPITAL_ONBOARD" },
          { label: "📦 수거요청", blockId: "PICKUP" },
          { label: "📄 자료요청", blockId: "RESOURCES" },
          { label: "📞 담당자 연결", blockId: "CONTACT" }
        ]
      }
    },
    {
      id: "ABOUT_TEST",
      name: "검사 안내",
      utterances: ["검사","검사안내","nipt","차이","무엇이 다른가","루킷 검사"],
      response: {
        text: "🧬 *루킷 NIPT 핵심 차이*\n\n• *검사 항목 확장*: 기본 염색체 + 성염색체 이상 + (선택) 미세결실 패널\n• *공급가 경쟁력*: 기존 대비 20~30% 저렴한 공급 단가\n• *병원 이점*: 소비자가 유지 → 마진 증가, 절차 변경 없음\n\n필요하신 항목을 선택해주세요.",
        quickReplies: [
          { label: "검사 구성 보기", blockId: "TEST_DETAILS" },
          { label: "수익 계산하기", blockId: "ROI_CALC" },
          { label: "병원 등록", blockId: "HOSPITAL_ONBOARD" },
          { label: "메인으로", blockId: "MAIN_MENU" }
        ]
      }
    },
    {
      id: "TEST_DETAILS",
      name: "검사 구성 상세",
      utterances: ["구성","항목","리포트","샘플","상세"],
      response: {
        text: "📋 *검사 구성(예)*\n- 기본: T21/T18/T13 + 성염색체 이상\n- 옵션: 선택형 미세결실 패널\n- 리포트: 병원 전용 PDF + 요약본(EMR 연동 가능)\n\n※ 임상적 판단과 확진검사는 주치의 소견에 따릅니다.",
        quickReplies: [
          { label: "리포트 샘플", blockId: "RESOURCES" },
          { label: "수익 계산하기", blockId: "ROI_CALC" },
          { label: "메인으로", blockId: "MAIN_MENU" }
        ]
      }
    },
    {
      id: "ROI_CALC",
      name: "병원 수익 계산",
      utterances: ["가격","비용","절감","수익","단가","얼마","계산"],
      response: {
        text: "💰 *병원 수익 시뮬레이터*\n현재 거래 단가와 월 검사 건수를 입력하면, 예상 절감액/마진을 즉시 확인하실 수 있어요.",
        buttons: [{ label: "📈 시뮬레이터 열기", url: "{{SIMULATOR_URL}}" }],
        quickReplies: [
          { label: "병원 등록", blockId: "HOSPITAL_ONBOARD" },
          { label: "자료요청", blockId: "RESOURCES" },
          { label: "메인으로", blockId: "MAIN_MENU" }
        ]
      }
    },
    {
      id: "HOSPITAL_ONBOARD",
      name: "병원 등록",
      utterances: ["등록","제휴","가입","신규","도입"],
      response: {
        text: "🏥 *신규 병원 등록*\n계약 의무 없이 시범 운영 가능하며, 첫 달 일부 물량 프로모션 단가를 적용해드립니다.\n담당 매니저가 24시간 내 연락드려요.",
        buttons: [{ label: "병원 등록하기", url: "{{ONBOARD_URL}}" }],
        quickReplies: [
          { label: "수익 계산", blockId: "ROI_CALC" },
          { label: "메인으로", blockId: "MAIN_MENU" }
        ]
      }
    },
    {
      id: "PICKUP",
      name: "검체 수거 요청",
      utterances: ["수거","택배","픽업","검체"],
      response: {
        text: "📦 *검체 수거 요청*\n접수 즉시 기사 배정이 진행됩니다. 평균 1시간 내 배정 완료!",
        buttons: [{ label: "수거 요청하기", url: "{{PICKUP_URL}}" }],
        quickReplies: [{ label: "메인으로", blockId: "MAIN_MENU" }]
      }
    },
    {
      id: "RESOURCES",
      name: "자료 요청",
      utterances: ["자료","샘플","브로셔","리포트","다운로드"],
      response: {
        text: "📄 *자료 모음*\n• 검사 리포트 샘플\n• 병원 수익 구조 안내서\n• 루킷 브로셔 (PDF)",
        buttons: [{ label: "자료 바로받기", url: "{{RESOURCES_URL}}" }],
        quickReplies: [{ label: "메인으로", blockId: "MAIN_MENU" }]
      }
    },
    {
      id: "CONTACT",
      name: "담당자 연결",
      utterances: ["상담","문의","전화","연락","직원"],
      response: {
        text: "📞 *담당자 연결*\n평일 09:00–18:00 (평균 응답 1시간 이내)\n• 전담 매니저: {{MANAGER_PHONE}}\n• 채팅상담: 아래 버튼으로 바로 연결",
        quickReplies: [
          { label: "채팅 연결", blockId: "HUMAN_HANDOFF" },
          { label: "메인으로", blockId: "MAIN_MENU" }
        ]
      }
    },
    {
      id: "HUMAN_HANDOFF",
      name: "사람 상담 전환",
      utterances: ["상담원","사람","오퍼레이터"],
      response: { text: "담당 매니저에게 대화를 전환합니다. 잠시만 기다려 주세요 🙌", handoff: true, quickReplies: [{ label: "메인으로", blockId: "MAIN_MENU" }] }
    }
  ]
}

function resolveVars(text: string, vars: Record<string,string>) {
  if (!text) return "";
  return text.replace(/\*([^*]+)\*/g, "<b>$1</b>").replace(/{{(\w+)}}/g, (_:any, k:string)=> vars[k] ?? "");
}

export default function Page() {
  const [history, setHistory] = useState<{from: "bot"; blockId: string}[]>([{ from: "bot", blockId: BOT.entry_block }]);
  const current = history[history.length-1];
  const block = BOT.blocks.find(b => b.id === current.blockId) ?? BOT.blocks[0];
  const go = (blockId: string) => setHistory(h => [...h, { from: "bot", blockId }]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardContent className="p-0">
          <div className="bg-[#FEE500] text-black font-semibold px-4 py-3 rounded-t-2xl">루킷 NIPT — 카카오 챗봇 미리보기</div>
          <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
            {history.map((h, i) => {
              const b = BOT.blocks.find(x=>x.id===h.blockId) ?? BOT.blocks[0];
              const resp:any = b.response;
              return (
                <div key={i} className="flex">
                  <div className="bg-white border rounded-xl p-3 shadow-sm">
                    <div className="prose prose-sm" dangerouslySetInnerHTML={{ __html: resolveVars(resp.text || "", BOT.variables).replace(/\n/g, "<br/>") }} />
                    {resp.buttons?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {resp.buttons.map((btn:any, idx:number) => (
                          <a key={idx} href={resolveVars(btn.url, BOT.variables)} target="_blank" rel="noreferrer">
                            <Button className="bg-gray-200 text-gray-900 hover:bg-gray-300">{btn.label}</Button>
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}

            <div className="flex flex-wrap gap-2">
              {block.response?.quickReplies?.map((qr:any, idx:number) => (
                <Button key={idx} onClick={() => go(qr.blockId)}>{qr.label}</Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
