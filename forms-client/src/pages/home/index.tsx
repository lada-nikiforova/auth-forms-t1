import { useAppSelector } from "@/app/provider/store";
import { Loader } from "@/shared/ui";
import { Table } from "@/widgets"

export const PageHome = () => {
  const isLoading = useAppSelector(state => state.auth.isLoading);
  if (isLoading) return <Loader/>;
  return (
    <div className="w-full flex justify-center">   
      <Table/>  
    </div>
  )
}

export default PageHome

