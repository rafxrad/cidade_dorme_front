import { getRandomNames } from '@/mocks/IconsData';
import { names } from '@/mocks/IconsData';
import CardPlayer from '@/components/CardPlayer';
import { Link, useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import { getRoomId, initGame } from '@/integration/Room';
import LoadingIcon from '../../public/icons/Loading';

interface Player {
  nome: string;
  conexaoId: string;
  papel: string | null;
  vivo: boolean;
}

function Play() {
  const id = Cookie.get('codigoSala');
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerNames, setPlayerNames] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [nameRoom, setNameRoom] = useState('');
  const navigate = useNavigate();

  if (!id) {
    throw new Error('Sala não encontrada.');
  }
  const initGameFunction = async () => {
    try {
      setIsLoading(true);
      await initGame(id);
      navigate('/game'); // Redireciona para /game após iniciar o jogo
    } catch (error) {
      console.error('Erro ao iniciar o jogo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      setIsLoading(true);
      try {
        const response = await getRoomId(id);
        console.log('API Response:', response); // <-- Verifica o formato da resposta
        setNameRoom(response.nome);
        // Verifica se o campo 'jogadores' existe e é um array
        const playerList: Player[] = Array.isArray(response.jogadores)
          ? response.jogadores
          : [];

        setPlayers(playerList);

        // Sorteia nomes aleatórios para os jogadores
        const selectedNames = getRandomNames(names, playerList.length);

        // Atribui nomes aleatórios para cada jogador, usando 'conexaoId' como chave
        const assignedNames: { [key: string]: string } = playerList.reduce(
          (acc, player, index) => {
            acc[player.conexaoId] = selectedNames[index]; // Atribui o nome aleatório
            return acc;
          },
          {} as { [key: string]: string }
        ); // Tipagem explicita do objeto

        setPlayerNames(assignedNames);
      } catch (error) {
        console.error('Erro ao buscar salas:', error);
        setPlayers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center flex-row w-full h-screen items-center gap-x-4 font-inter-medium text-clt-2 bg-backgroundMy'>
          <div className='animate-spin'>
            <LoadingIcon />
          </div>
          Carregando...
        </div>
      ) : players ? (
        <div className='h-full w-full flex justify-center items-center flex-col overflow-y-auto'>
          <div className='flex items-center justify-between flex-col p-7 rounded-xl bg-purple-300 bg-opacity-50 backdrop-blur-sm shadow-2xl w-[50%] max-h-[65%] border border-primaryMy'>
            <p className='font-space-medium text-2xl text-black pr-5 w-full mb-3'>
              Iniciar Partida - Sala
              <span className='capitalize'> {nameRoom}</span>
            </p>
            <div className='grid grid-cols-2 w-full min-h-48'>
              {players.map((player) => (
                <CardPlayer
                  key={player.conexaoId}
                  name={playerNames[player.conexaoId] || 'Desconhecido'}
                  realName={player.nome} // Exibimos o nome real também
                />
              ))}
            </div>
            <div className='flex w-full gap-x-6 mt-5'>
              <Link
                to={'/room'}
                className='flex items-center justify-center w-full min-h-9 bg-primaryMy rounded-lg font-space-medium text-sm text-white hover:bg-opacity-90'
              >
                <p className='uppercase'>Destruir Sala</p>
              </Link>
              <button
                onClick={initGameFunction}
                className='flex items-center justify-center w-full min-h-9 bg-primaryMy rounded-lg font-space-medium text-sm text-white hover:bg-opacity-90'
              >
                <p className='uppercase'>Iniciar Jogo</p>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>loucura</div>
      )}
    </>
  );
}

export default Play;
