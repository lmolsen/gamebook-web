import "./Notes.scss";

export default function Notes({ wasHighlighted, isSolved, isSpelled }) {

  return (
    <div className="notes">
      {wasHighlighted && <p>Secret passphrase: rootroot</p>}
      {isSolved && <p>Runic word: Edoc'sv</p>}
      {isSpelled && <p>Cubic passphrase: syntax</p>}
      {!wasHighlighted && !isSolved && !isSpelled && <p>Nothing yet.</p>}
    </div>
  );
}
