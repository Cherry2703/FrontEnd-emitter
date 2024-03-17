import "./LeaderBoard.css"

const LeaderBoard=(props)=>{
    const {leaderBoardData}=props
    

    return(
        <div className="leader-board-cont">
            <h1>Leader Board</h1>
            <table className="table-container">
                <tr className="roww">
                    <th>NAME</th>
                    <th>SCORE</th>
                </tr>
                {leaderBoardData.map(each=>(
                    <tr className="roww" key={each.userId}>
                        <td>{each.userName}</td>
                        <td>{each.userScore}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}
    

export default LeaderBoard