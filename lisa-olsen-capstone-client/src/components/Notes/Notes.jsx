import "./Notes.scss"

export default function Notes({hasTextBeenHighlighted}) {


    return (
        <>
        {hasTextBeenHighlighted ? <p>Secret passphrase: rootroot</p> :<p>Nothing yet.</p> } {/*change to be there if nothing else is */} 
        </>
    );
}