"use client";
import { useMemo, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function Simulator() {
  const [hospitalSize, setHospitalSize] = useState<"small"|"medium"|"large">("medium");
  const [monthlyTests, setMonthlyTests] = useState<number>(40);
  const [currentPrice, setCurrentPrice] = useState<number>(45);
  const [lead, setLead] = useState({ hospitalName: "", contactName: "", phone: "", email: "", note: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<null | { ok: boolean; message: string }>(null);

  const basePricing = useMemo(()=>({ small: 37, medium: 35, large: 33 }), []);
  const computeOurPrice = (size: "small"|"medium"|"large", volume: number) => {
    let price = basePricing[size];
    if (volume >= 80) price -= 2;
    else if (volume >= 50) price -= 1;
    return Math.max(price, 30);
  };
  const ourUnitPrice = useMemo(()=> computeOurPrice(hospitalSize, monthlyTests), [hospitalSize, monthlyTests]);

  const calc = useMemo(()=>{
    const unitDiff = currentPrice - ourUnitPrice;
    const monthlySavings = Math.max(0, unitDiff * Math.max(0, monthlyTests));
    const yearlySavings = monthlySavings * 12;
    const savingRate = currentPrice > 0 ? Math.max(0, (unitDiff / currentPrice) * 100) : 0;
    return { unitDiff, monthlySavings, yearlySavings, savingRate };
  }, [currentPrice, ourUnitPrice, monthlyTests]);

  const priceCompareData = [
    { name: "현재 단가", price: Number(currentPrice.toFixed(2)) },
    { name: "제안 단가", price: Number(ourUnitPrice.toFixed(2)) },
  ];
  const savingsData = [
    { name: "월 절감", amount: Number(calc.monthlySavings.toFixed(2)) },
    { name: "연 절감", amount: Number(calc.yearlySavings.toFixed(2)) },
  ];

  const formRef = useRef<HTMLDivElement|null>(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(null);
    if (!lead.hospitalName || !lead.contactName || !lead.phone || !lead.email) {
      setSubmitted({ ok: false, message: "병원명, 담당자, 연락처, 이메일은 필수입니다." });
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...lead,
        inputs: { hospitalSize, monthlyTests, currentPrice },
        quote: { ourUnitPrice, unitDiff: calc.unitDiff, monthlySavings: calc.monthlySavings, yearlySavings: calc.yearlySavings, savingRate: calc.savingRate },
        timestamp: new Date().toISOString(),
      };
      // Placeholder: replace with your API
      await new Promise(r => setTimeout(r, 800));
      console.log("Lead payload:", payload);
      setSubmitted({ ok: true, message: "견적 요청이 접수되었습니다. 곧 연락드릴게요!" });
      setLead({ hospitalName: "", contactName: "", phone: "", email: "", note: "" });
    } catch (e) {
      setSubmitted({ ok: false, message: "전송 중 문제가 발생했습니다. 다시 시도해 주세요." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">병원 맞춤 NIPT 수익 시뮬레이터</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          병원 규모와 검사 건수에 따라 자동 산정되는 제안 단가를 기준으로, 현재 거래 대비 절감액과 마진 상승을 즉시 확인하세요.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold text-blue-800">입력</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>병원 규모</Label>
                <RadioGroup defaultValue="medium" onValueChange={(v:any)=> setHospitalSize(v)} className="flex md:block gap-4 mt-2">
                  <div className="flex items-center gap-2"><RadioGroupItem value="small" id="small" /><Label htmlFor="small">소형</Label></div>
                  <div className="flex items-center gap-2"><RadioGroupItem value="medium" id="medium" /><Label htmlFor="medium">중형</Label></div>
                  <div className="flex items-center gap-2"><RadioGroupItem value="large" id="large" /><Label htmlFor="large">대형</Label></div>
                </RadioGroup>
                <p className="text-xs text-gray-500 mt-2">※ 자동 제안 단가(만원): 소형 {basePricing.small} / 중형 {basePricing.medium} / 대형 {basePricing.large} + 물량 할인 적용</p>
              </div>
              <div>
                <Label>월 NIPT 검사 건수</Label>
                <Input type="number" min={0} value={monthlyTests} onChange={(e)=> setMonthlyTests(Math.max(0, Number(e.target.value)))} className="mt-2" />
                <p className="text-xs text-gray-500 mt-2">50건 이상 1만원, 80건 이상 2만원 추가 할인</p>
              </div>
              <div>
                <Label>현재 거래 단가 (만원)</Label>
                <Input type="number" min={0} value={currentPrice} onChange={(e)=> setCurrentPrice(Math.max(0, Number(e.target.value)))} className="mt-2" />
              </div>
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
                <div className="text-sm text-blue-900 font-medium">자동 산정 제안 단가</div>
                <div className="text-2xl font-extrabold text-blue-700 mt-1">{ourUnitPrice.toLocaleString()} 만원</div>
                <div className="text-xs text-blue-700/80 mt-1">(규모·물량 할인 반영)</div>
              </div>
            </div>
            {currentPrice <= ourUnitPrice && (
              <div className="text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-3 text-sm">
                현재 단가가 제안 단가 이하입니다. 입력값을 확인하거나 세부 조건에 따라 개별 견적을 요청해 주세요.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold text-blue-800">단가 비교</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priceCompareData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis unit="만원" />
                  <Tooltip formatter={(v:number)=> `${v.toLocaleString()} 만원`} />
                  <Legend />
                  <Bar dataKey="price" name="단가" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <h2 className="text-lg font-semibold text-blue-800">절감 효과</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={savingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis unit="만원" />
                  <Tooltip formatter={(v:number)=> `${v.toLocaleString()} 만원`} />
                  <Legend />
                  <Bar dataKey="amount" name="금액" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 text-center">
              <div className="text-sm text-blue-900">예상 절감율</div>
              <div className="text-3xl font-extrabold text-blue-700">{calc.savingRate.toFixed(1)}%</div>
              <div className="text-sm text-blue-700/80 mt-1">월 {calc.monthlySavings.toLocaleString()} 만원 · 연 {calc.yearlySavings.toLocaleString()} 만원</div>
              <Button className="mt-3 bg-yellow-400 text-black hover:opacity-90" onClick={scrollToForm}>📩 맞춤 견적서 받아보기</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div ref={formRef} className="w-full max-w-3xl mt-10">
        <Card className="shadow-md">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold text-blue-800">맞춤 견적 요청</h2>
            <p className="text-gray-600 text-sm">아래 정보를 남겨주시면, 입력하신 조건을 바탕으로 상세 견적과 제안 단가 표를 보내드립니다.</p>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>병원명 *</Label><Input value={lead.hospitalName} onChange={(e)=> setLead(s=>({...s, hospitalName: e.target.value}))} /></div>
              <div><Label>담당자 이름 *</Label><Input value={lead.contactName} onChange={(e)=> setLead(s=>({...s, contactName: e.target.value}))} /></div>
              <div><Label>연락처(휴대폰) *</Label><Input value={lead.phone} onChange={(e)=> setLead(s=>({...s, phone: e.target.value}))} /></div>
              <div><Label>이메일 *</Label><Input type="email" value={lead.email} onChange={(e)=> setLead(s=>({...s, email: e.target.value}))} /></div>
              <div className="md:col-span-2"><Label>추가 메모 (선택)</Label><Textarea rows={3} value={lead.note} onChange={(e)=> setLead(s=>({...s, note: e.target.value}))} /></div>
              <div className="md:col-span-2 flex items-center gap-3">
                <Button type="submit" disabled={submitting}>{submitting ? "전송 중..." : "견적 요청 보내기"}</Button>
                {submitted && <span className={`${submitted.ok ? "text-green-700" : "text-red-700"} text-sm`}>{submitted.message}</span>}
              </div>
            </form>
            <div className="text-xs text-gray-500">※ 전송되는 정보: 입력값(규모, 월 검사수, 현재 단가)과 자동 산정 결과(제안 단가, 절감액/절감율).</div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-xs text-gray-500 mt-8">
        © 2025 Company, Inc. | 본 시뮬레이션 결과는 참고용이며 실제 제안 단가는 정산 조건 및 계약 기간에 따라 달라질 수 있습니다.
      </div>
    </div>
  );
}
