import Nav from './Nav'
import Canvas from './Canvas'
import Grid from './Grid'
function Main() {
  return (
    <div className="h-screen">
     {/* <Nav className="h-100"/>*/}
      {/*<header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-0">
          <h1 className="text-3xl font-bold text-gray-900">
            Project ABC Board
          </h1>
        </div>
      </header>*/}
      <main className="h-full">
        <div className="flex h-full">
          <div className="w-1/4 overflow-x-scroll">
            <Grid />
          </div>
          <div className="w-3/4 h-full border border-solid border-gray-300  ">
            <Canvas />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main