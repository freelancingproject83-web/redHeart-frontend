
import './App.css';
import AxiosInterceptorProvider from './interceptors/axiosInterceptorProvider';

function AppContent() {

  return (
   <ScrollToTop>
   
        <Router />
      
    </ScrollToTop>
  );
}
function App() {
  return (

      <BrowserRouter>
        <AxiosInterceptorProvider>

          <AppContent />
   
        </AxiosInterceptorProvider>
      </BrowserRouter>

  );
}

export default App;
