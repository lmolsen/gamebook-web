import "./WallOfFame.scss"

export default function WallOfFame () {
    return (
<div className="wall-of-fame">
    <h1 className="wall-of-fame__title">Wall of Fame</h1>
    <div className="wall-of-fame__entries">
        <p className="wall-of-fame__name">Lisa Olsen</p>
        <p className="wall-of-fame__accomplishment">Completed a proof of concept.</p>
    </div>
    <div className="wall-of-fame__entries">
        <p className="wall-of-fame__name">Name McFakesly</p>
        <p className="wall-of-fame__accomplishment">Discovered an ancient magic tome.</p>
    </div>
</div>
    );
}