import MainLayout from "./components/layout/MainLayout";
import ProtectedRoutes from "./components/layout/ProtectedRoutes";

const App = () => {
  return (
    <ProtectedRoutes>
      <MainLayout />
    </ProtectedRoutes>
  );
};

export default App;