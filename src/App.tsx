import './App.css';
import '@mantine/core/styles.css';
import { ChessBoard } from './components/ChessBoard';
import { MantineProvider } from '@mantine/core';

function App() {
    return (
        <MantineProvider>
            <ChessBoard />
        </MantineProvider>
    );
}

export default App;
