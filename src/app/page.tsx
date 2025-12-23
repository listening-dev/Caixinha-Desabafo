import Image from "next/image"
import { FeedbackForm } from "@/components/FeedbackForm"

export default function Home() {
  return (
    <main className="min-h-screen bg-background py-16 md:py-24 px-4 selection:bg-brand-orange selection:text-white relative overflow-hidden font-sans">
      {/* Top Decorations */}
      <div className="absolute top-0 left-0 w-32 md:w-64 pointer-events-none mix-blend-multiply opacity-60">
        <Image
          src="/esquerda_topo.png"
          alt="Decoration Left"
          width={256}
          height={256}
          className="w-full h-auto"
          priority
        />
      </div>
      <div className="absolute top-0 right-0 w-32 md:w-64 pointer-events-none mix-blend-multiply opacity-60">
        <Image
          src="/diretira_topo.png"
          alt="Decoration Right"
          width={256}
          height={256}
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col min-h-[85vh]">
        <header className="mb-12 md:mb-16 text-center space-y-6">
          <div className="flex justify-center mb-8 relative">
            <Image
              src="/logo-listening.png"
              alt="Listening Research"
              width={400}
              height={200}
              className="h-32 md:h-48 w-auto object-contain"
              priority
              unoptimized
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#1a1a1a] tracking-tighter leading-tight drop-shadow-sm">
            Caixinha do <span className="text-brand-orange">Desabafo</span>
          </h1>
          <p className="text-lg md:text-xl text-[#333333] max-w-2xl mx-auto leading-relaxed font-medium opacity-90">
            Um espaço protegido para você compartilhar ideias, elogios ou preocupações.
            <br className="hidden md:block" /> Sua identidade é 100% preservada.
          </p>
        </header>

        {/* Form taking main focus */}
        <div className="flex-1 w-full">
          <FeedbackForm />
        </div>

        <footer className="mt-24 text-center space-y-8 pb-8">
          <div className="flex justify-center w-full px-4">
            <Image
              src="/regua.png"
              alt="Parceiros"
              width={900}
              height={120}
              className="w-full max-w-3xl h-auto opacity-95 mix-blend-multiply"
            />
          </div>
          <div className="text-sm text-[#4a4a4a] font-semibold tracking-wide">
            &copy; 2025 Listening Research. Todos os direitos reservados.
          </div>
        </footer>
      </div>
    </main>
  )
}
