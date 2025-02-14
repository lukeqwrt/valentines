import { useContext, useEffect, useState } from 'react'
import AskingQuestion from '../components/AskingQuestion'
import { Link } from 'react-router';
import { GlobalContext } from '../GlobalContext';
const Home = () => {
  const {foodState, setFoodState} = useContext(GlobalContext)
  const [computeChoosedFood, setComputeChoosedFood] = useState([])
  useEffect(() => {
    if(foodState.image || foodState.input){
      setComputeChoosedFood([...foodState.image, ...foodState.input]) 
    }
  }, [])

    return (
        <div className="main min-h-screen flex justify-center items-center bg-slate-200 max-md:px-3 max-sm:pb-5">
                <div className="w-full max-w-[1140px] gap-x-5 grid grid-cols-2 @  max-sm:grid-cols-1 max-sm:gap-y-5">
                  <div className="left max-sm:min-h-[58vh] max-sm:flex max-sm:justify-center max-sm:items-center max-sm:flex-col">
                    <h3 className="font-playwrite text-5xl w-full max-w-[400px] leading-[90px] max-lg:text-3xl max-lg:leading-normal max-sm:text-center max-sm:leading-[60px]">Will you be my Valentine?</h3>
                    <div className="date text-xl mt-5">
                      Friday, Feb 15
                    </div>
                    <div className="time text-lg text-gray-500">
                      9:00 AM
                    </div>
        
                    <div className="grid gap-5 ">
                      <div className="foodlist flex gap-2 flex-wrap mt-5">
                        {computeChoosedFood.length === 0 &&
                          <div>
                            <Link to="/food" className='px-5 py-3 rounded-lg cursor-pointer bg-primary text-secondary font-poppins'>Add Food</Link>
                          </div>
                        }
                        {computeChoosedFood.length > 0 &&
                            computeChoosedFood.map((food, index) => (
                                <p key={index} className="text-secondary bg-primary px-3 py-1 rounded-full flex items-center gap-2">
                                    {food.food}
                                </p>
                            ))
                        }
                      </div>
                      {computeChoosedFood.length > 0 && 
                        <Link to="/food" className="edit w-full max-w-[70px] px-3 py-1 rounded-lg cursor-pointer text-center border-2 border-primary text-primary font-poppins">Edit</Link>
                      }
                    </div>
                  </div>
                  <div className="right">
                    <AskingQuestion/>
                  </div>
                </div>
              </div>
    );
}
 
export default Home;