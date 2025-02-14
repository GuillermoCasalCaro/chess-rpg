import '@pixi/events';
import { Pawn } from './Pieces/WhitePawn';
import { WhiteRook } from './Pieces/WhiteRook';
import { Piece } from './Pieces/types';

interface PieceProps {
    piece: Piece;
}

const PIECE_SIZE = 100;

export const PieceWrapper = ({ piece }: PieceProps) => {
    if (piece.color === 'white') {
        if (piece.type === 'pawn') {
            return (
                <Pawn
                    id={piece.id}
                    position={piece.tile}
                    height={PIECE_SIZE}
                    width={PIECE_SIZE}
                />
            );
        }
        if (piece.type === 'rook') {
            return (
                <WhiteRook
                    id={piece.id}
                    position={piece.tile}
                    height={PIECE_SIZE}
                    width={PIECE_SIZE}
                />
            );
        }
    }
    return <></>;
};
