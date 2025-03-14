import "./Notes.scss";

export default function Notes({ hasTextBeenHighlighted, isSolved }) {
  return (
    <>
      {hasTextBeenHighlighted && <p>Secret passphrase: rootroot</p>}
      {isSolved && <p>Runic word: Edoc'sv</p>}
      {!hasTextBeenHighlighted && !isSolved && <p>Nothing yet.</p>}
    </>
  );
}
