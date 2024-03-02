import React from "react";
import Header from "../components/Header";
import Layout from "../components/Layout";
import TimetableAccordion from "./../components/TimetableAccordion";
import { useUserStore } from "./../store/store";
// import axios from "axios";

const TimetablePage = () => {
  const user = useUserStore((state) => state.user);

  // const [purchase, setPurchase] = useState([]);

  // const getPuchase = async () => {
  //   // console.log(user._id);
  //   if (user) {
  //     // const purchase_res = await axios.get(
  //     //   `${process.env.REACT_APP_API_URL}/purchase/${user._id}`
  //     // );

  //     // console.log(purchase_res.data);
  //     // setPurchase(purchase_res.data);
  //   }
  // };

  // useEffect(() => {
  //   getPuchase();
  // }, []);

  return (
    <Layout title="Time Table">
      <Header title="My Time Table" subTitle="Here is your time table" />
      <div className="mx-20 mt-8 mb-10 ">
        {user?.user?.batches?.map((batch) => {
          return <TimetableAccordion {...batch} />;
        })}
        {user?.user?.batches?.length === 0 && <div className="h-100v" style={{height: '60vh'}}><h1 className="text-center text-2xl font-bold">You are not enrolled into any courses</h1></div>}
      </div>
    </Layout>
  );
};

export default TimetablePage;
