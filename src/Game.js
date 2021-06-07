import * as Chess from 'chess.js'
import { BehaviorSubject } from 'rxjs'
//servable which helps to listen changes happening

const chess = new Chess()


export const gameSubject=new BehaviorSubject()

export function initGame(){
  updateGame()
}

export function resetGame(){
	chess.reset()
	updateGame()
}

export function handleMove(from,to){
	const promotions=chess.moves({
		verbose:true
	}).filter(m=>m.promotion)
	console.log(promotions )
	if(promotions.some(p=>`${p.from}:${p.to}`
	=== 
	`${from}:${to}`)
		)
		{
			const pendingPromotion={ from,to,color:promotions[0].color }
			updateGame(pendingPromotion)
		}
		const {pendingPromotion} = gameSubject.getValue()
		if(!pendingPromotion){
	move(from,to)}

}
export function move(from,to,promotion){
	let tempMove = {from,to}
	if(promotion){
		tempMove.promotion=promotion
	}
 const legalMove =	chess.move(tempMove )
 if(legalMove){
	updateGame()
 }
}
function updateGame(pendingPromotion){
	const isGameOver = chess.game_over()
	const newGame={
		board:chess.board(),
		pendingPromotion,
		isGameOver,
		turn:chess.turn(),
		result : isGameOver ? getGameResult() :null
	}
 	gameSubject.next(newGame)

}

function getGameResult(){
	if(chess.in_checkmate()){
		const winner = chess.turn()=== "w" ? 'BLACK' :'WHITE'
		return `CHECKMATE -WINNER - ${winner}`

	}
	else if(chess.in_draw()){
		let reason = '50 - MOVES - RULE'
		if(chess.in_stalemate()){
			reason = 'STALEMATE'
		}
		// a position in which player to move has no legal moves but is 
		//not in check
		else if (chess.in_threefold_repetition()){
			reason='REPETITION'
		}
		else if(chess.insufficient_material){
			//if both kings are left
			reason = "INSUFFICIENT MATERIAL"
		}
		return `DRAW  - ${reason}`

	}
	else {
		return 'UNKWOWN RESULT'
	}
}
