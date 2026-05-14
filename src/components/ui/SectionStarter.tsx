type Props = {
  num: number;
  total?: number;
  title: string;
  lede?: string;
};

/**
 * Numbered section header — "01 / 06" stripe + display title + lede paragraph.
 */
export function SectionStarter({ num, total = 6, title, lede }: Props) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <header className="starter fade-up">
      <div className="num">
        {pad(num)} / {pad(total)}
      </div>
      <div>
        <h1 className="title">{title}</h1>
        {lede ? <p className="lede">{lede}</p> : null}
      </div>
    </header>
  );
}
