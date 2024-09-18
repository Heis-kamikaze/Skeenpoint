import BillingDetails from "../Components/BillingDetails"
import { useUserStore } from "../stores/useUserStore"
import MiniLoader from './../Components/MiniLoader';


const ProfilePage = () => {

  const {logout, loading} = useUserStore()

  const handleLogout = () => {
    try {
      
      logout()
      
    } catch (error) {
      
    }
  }
  return (
    <div className="pt-12 sm:pt-16 md:pt-24">
      <h1>Profile Page</h1>
      <button className="p-2 bg-red-600 rounded-lg" 
      onClick={handleLogout} disabled={loading}>
        {
          loading ? (
           <MiniLoader />
          ) : (
            "Logout"
          )
        }
      </button>

      <BillingDetails />
    </div>
  )
}

export default ProfilePage