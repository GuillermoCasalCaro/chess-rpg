import { Container } from '@mantine/core';
import { ChessBoard } from './chess-board/ChessBoard';

interface GameScreenProps {
    onMenuClicked: () => void;
}

export const GameScreen = ({ onMenuClicked }: GameScreenProps) => {
    return (
        <Container
            fluid
            style={{
                display: 'flex',
                flexDirection: 'row',
                padding: '0',
            }}
        >
            <Container style={{ flexGrow: 1 }}>Shop</Container>
            <Container style={{ width: '850px' }}>
                <ChessBoard onMenuClicked={onMenuClicked} />
            </Container>
            <Container style={{ flexGrow: 1 }}>Upgrades</Container>
        </Container>
    );
};
