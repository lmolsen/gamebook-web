import "./Notes.scss";

export default function Notes({ hasTextBeenHighlighted, isSolved, isSpelled }) {

  return (
    <>
      {hasTextBeenHighlighted && <p>Secret passphrase: rootroot</p>}
      {isSolved && <p>Runic word: Edoc'sv</p>}
      {isSpelled && <p>Cubic passphrase: syntax</p>}
      {!hasTextBeenHighlighted && !isSolved && !isSpelled && <p>Nothing yet.</p>}
    </>
  );
}
