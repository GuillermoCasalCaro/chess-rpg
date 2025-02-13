import { Container } from '@mantine/core';
import { ChessBoard } from './chess-board/ChessBoard';

interface GameScreenProps {}

export const GameScreen = ({}: GameScreenProps) => {
    return (
        <Container style={{ display: 'flex', flexDirection: 'column' }}>
            <Container style={{ flexGrow: 1 }}>Menu</Container>
            <Container style={{ width: '820px' }}>
                <ChessBoard
                    onMenuClicked={function (): void {
                        throw new Error('Function not implemented.');
                    }}
                />
            </Container>
            <Container style={{ flexGrow: 1 }}>Upgrades</Container>
        </Container>
    );
};
