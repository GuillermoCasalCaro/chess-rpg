import '@pixi/events';
import { WhitePawn } from './Pieces/WhitePawn';
import { WhiteRook } from './Pieces/WhiteRook';
import { Piece } from './Pieces/types';
import { BlackPawn } from './Pieces/BlackPawn';

interface PieceProps {
    piece: Piece;
}

const PIECE_SIZE = 100;

export const PieceWrapper = ({ piece }: PieceProps) => {
    if (piece.color === 'white') {
        if (piece.type === 'pawn') {
            return (
                <WhitePawn
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
    } else {
        if (piece.type === 'pawn') {
            return (
                <BlackPawn
                    id={piece.id}
                    position={piece.tile}
                    height={PIECE_SIZE}
                    width={PIECE_SIZE}
                />
            );
        }

        return <></>;
    }
};
