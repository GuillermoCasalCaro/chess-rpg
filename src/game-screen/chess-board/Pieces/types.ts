export type PieceMark = 'pawn' | 'rook';
export type PieceColor = 'white' | 'black';
export type Tile = { x: number; y: number };
export type Piece = {
    id: string;
    type: PieceMark;
    tile: Tile;
    numberOfMoves: number;
    color: PieceColor;
    kills: number;
};
export type PiecePositions = Record<string, Piece>;
