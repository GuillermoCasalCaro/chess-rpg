import { Container } from '@mantine/core';
import { ChessBoard } from './chess-board/ChessBoard';
import { Shop } from './shop/Shop';
import { Upgrades } from './upgrades/Upgrades';

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
            <Container style={{ flexGrow: 1 }}>
                <Shop />
            </Container>
            <Container style={{ width: '850px' }}>
                <ChessBoard onMenuClicked={onMenuClicked} />
            </Container>
            <Container style={{ flexGrow: 1 }}>
                <Upgrades />
            </Container>
        </Container>
    );
};
