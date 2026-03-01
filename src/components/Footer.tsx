export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-white/[0.02]">
      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div>
          <div className="font-black text-white">IT Health Lab</div>
          <div className="text-xs text-muted mt-2 max-w-xl leading-relaxed">
            Информационный ресурс о профилактике профессиональных рисков в IT. Материалы не являются медицинской консультацией.
            При выраженных симптомах обращайтесь к врачу.
          </div>
        </div>
        <div className="text-xs text-muted">
          © {new Date().getFullYear()} IT Health Lab
        </div>
      </div>
    </footer>
  );
}
