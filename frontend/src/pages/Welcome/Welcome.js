import Header from '../../components/Header/Header'
import Main from '../../components/Main/Main'

export default function Welcome() {
  return (
    <>
      <Header />
      <Main>
        <div
          style={{
            background: 'white',
            borderRadius: '20px',
            width: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2>Добро пожаловать</h2>
          <p></p>
        </div>
      </Main>
    </>
  )
}
