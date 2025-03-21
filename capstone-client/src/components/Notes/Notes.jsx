import "./Notes.scss";

export default function Notes({ wasHighlighted, isSolved, isSpelled }) {

  return (
    <div className="notes">
      {wasHighlighted && <p className="notes__text">Secret passphrase: rootroot</p>}
      {isSolved && <p className="notes__text">Runic word: Edoc'sv</p>}
      {isSpelled && <p className="notes__text">Cubic passphrase: syntax</p>}
      {!wasHighlighted && !isSolved && !isSpelled && <p className="notes__text">Nothing yet.</p>}
    </div>
  );
}
