import { useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { GlobalContext } from "../GlobalContext";
import { Link } from "react-router";
const FoodChoice = () => {
    const {foodState,setFoodState} = useContext(GlobalContext)
    const [images,setImages] = useState([
        { 
            isImage: true, 
            imageUrl: '/src/assets/img/pexels-anna-guerrero-788383-10802307.jpg',
            food:'Pasta',
            liked: false
        },
        {
            isImage: true,
            imageUrl: '/src/assets/img/pexels-babydov-7788311.jpg',
            food:'Korean Chicken',
            liked: false
        },
        {
            isImage: true,
            imageUrl: '/src/assets/img/pexels-markusspiske-109395.jpg',
            food:'Steak',
            liked: false
        },
        {
            isImage: true,
            imageUrl: '/src/assets/img/pexels-mikegles-13015753.jpg',
            food:'Ramen',
            liked: false
        },
        {
            isImage: true,
            imageUrl: '/src/assets/img/pexels-sydney-troxell-223521-708587.jpg',
            food:'Pizza',
            liked: false
        },
        {
            isImage: true,
            imageUrl: '/src/assets/img/pexels-valeriya-1639562.jpg',
            food:'Burger',
            liked: false
        },
        {
            isImage: true,
            imageUrl: '/src/assets/img/pexels-rdne-5779423.jpg',
            food:'Shawarma',
            liked: false
        },
        {
            isImage: true,
            imageUrl: '/src/assets/img/pexels-mateusz-dach-99805-1275692.jpg',
            food:'Sausage',
            liked: false
        },
        {
            isImage: true,
            imageUrl: '/src/assets/img/pexels-dana-tentis-118658-1213710.jpg',
            food:'Salad',
            liked: false
        },
    ]) 


    const [choosedFood, setChoosedFood] = useState(
        {
            image: [],
            input: []
        }
    )
    const [err, setErr] = useState()
    const [otherFood, setOtherFood] = useState('')

    const handleFoodClicked = (foodDetails) => {
        const { foodChoice, id } = foodDetails
        
        // for images liked
        const likedImages = images.map((item,index) => index === id ? {...item, liked: !item.liked} : item)
        setImages(likedImages)
        
        // for choosed food state
        const setNewFood = likedImages.filter((item,index) => item.liked).map(item => ({food: item.food,isImage: item.isImage}))
        // if(setNewFood[0].food === foodChoice){
        //     return
        // }
        setFoodState((prev) => {

            if(prev.input){
                return {image: setNewFood, input: [...prev.input]} 
            }else{
                return {image: setNewFood, input: []}
            }
        });

    }

    const submitOtherFood = (e) => {
        e.preventDefault();
        if(otherFood === ''){
            setErr('Please enter a food name')
            return
        }
        if(!/^[A-Za-z\s]+$/.test(otherFood.trim())) {
            setErr('Please enter a valid food name')
            return
        }
        if(otherFood.trim().length < 2){
            setErr('Please enter at least 2 characters')
            return
        }
        
        if(foodState.input && foodState.input.some(item => item.food === otherFood)){
            setErr('Nalagay mo na')
            return
        }
        setFoodState((prev) => {
            if(prev.image){
                if(prev.input){
                    return {image: [...prev.image], input: [...prev.input, {food: otherFood}]}
                }else{
                    return {image: [...prev.image], input: [otherFood]}
                }
            }else{
                if(prev.input){
                    return {input: [...prev.input, {food: otherFood}]}
                }else{
                    return {input: [{food: otherFood}]}
                }
            }
        })
        setErr('')
        setOtherFood('')
    }

    const [computeChoosedFood, setCompute] = useState([])

    useEffect(() => {
        if(Object.keys(foodState).length > 0){
            if(foodState.image){
                if(foodState.input){
                    setCompute([...foodState.image, ...foodState.input]) 
                }else{
                    setCompute([...foodState.image]) 
                }
            }else{
                setCompute([...foodState.input]) 
            }
        }
        // setFoodState(foodState)
    }, [foodState])


    // Remove choosed food
    const removeChoosedFood = (foodArray) => {
        
        if(foodArray.isImage){
            const filterChoosedFood = foodState.image.filter(item => item.food !== foodArray.food)
            
            setFoodState((prev) => {
                if(prev.input){
                    return {image: filterChoosedFood, input: [...prev.input]} 
                }else{
                    return {image: filterChoosedFood, input: []}
                }
            });

            // removed liked
            const removeLiked = images.map(item => item.food === foodArray.food ? {...item, liked: false} : item)
            setImages(removeLiked)
        }else{
            const removedInputedFood = foodState.input.filter((item) => item.food !== foodArray.food)
            setFoodState((prev) => {
                if(prev.image){
                    return {image: [...prev.image], input: removedInputedFood}
                }else{
                    return {input: removedInputedFood}
                }
            })
        }
    }


    return (
        <div className="food container mt-[200px] pb-[80px] w-full max-w-[1140] mx-auto flex flex-col items-center justify-center px-3">
            <Link to="/" className="back px-5 py-3 rounded-lg cursor-pointer bg-primary text-secondary font-poppins absolute top-[20px] left-[20px]">Back</Link>
            
            <h1 className="text-3xl mb-5">What do you want to eat?</h1>
            <form onSubmit={submitOtherFood} className="flex flex-col items-center mt-2 gap-3 w-full max-w-[400px]">
                <div className="form-grp w-full">
                    <input onChange={(e) => setOtherFood(e.target.value)} value={otherFood} className="outline-none border-2 h-[50px] border-primary rounded-md w-full  px-3 py-1" type="text" placeholder="Not on the choices? answer here!" />
                    {err &&
                        <span className="text-red-700 mt-1">{err}</span>
                    }
                </div>
                <button className="px-5 py-3 w-full max-w-[100px] rounded-lg cursor-pointer bg-primary text-secondary font-poppins">Submit</button>
            </form>
            <div className="foodlist flex gap-2 flex-wrap mt-5">
                {computeChoosedFood.length > 0 && 
                    computeChoosedFood.map((food, index) => (
                        <p key={index} className="text-secondary bg-primary px-3 py-1 rounded-full flex items-center gap-2">
                            {food.food}
                            <span onClick={() => removeChoosedFood(food)} className="text-lg cursor-pointer">&times;</span>
                        </p>
                     ))
                }

            </div>
            {/* <div className="button-container fixed left-0 bottom-0 flex justify-center items-center bg-[rgba(0,0,0,0.3)] w-full z-50 py-5">
                <button
                 onClick={() => done()} 
                disabled={!computeChoosedFood || computeChoosedFood.length === 0} className="px-2 py-1 h-[4 0px] w-full max-w-[100px] rounded-lg cursor-pointer text-primary  font-poppins shadow-2xl border bg-white border-primary hover:bg-primary hover:text-secondary duration-200 disabled:bg-[#999] disabled:text-[#686868] disabled:border-[#686868] disabled:opacity-[0.5] disabled:pointer-events-none ">Done</button>

            </div> */}
                

            <div className="image-container grid grid-cols-3 mt-5 max-md:grid-cols-2">
                {images.map((img, index) => (
                    <div 
                        onClick={() => handleFoodClicked({foodChoice: img.food, id: index})}
                        key={index} 
                        className="image-food relative object-cover h-full w-full cursor-pointer"
                    >
                          <img className="h-full w-full" src={img.imageUrl} alt={img.alt} />
                          {img.liked &&
                            <div className="added-state absolute z-10 left-0 top-0 w-full h-full flex justify-center items-center flex-col gap-2 bg-[rgba(0,0,0,0.5)] duration-300">
                                <Icon className="text-4xl text-red-500 " icon="solar:heart-bold" />
                                <span className="text-white font-poppins ">Added</span>
                            </div>
                          }
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default FoodChoice;