import React from 'react'
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
const Admin = () => {
    const router=useRouter();
    const showproducts=()=>
    {
        router.push('/ShowAllProducts')
    };
    const showreviews=()=>
        {
            router.push('/ShowAllReviews')
        };

    return (
        <div>

            <div>
                <h2 className="flex justify-center text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-brown-500 to-black inline-block">
                    Welcome, Admin
                </h2>
            </div>

            <div>
                <h2 className="px-10 py-10 text-4xl font-extrabold text-red-800">
                    Add or view products
                </h2>
                <div className='flex justify-center'>
                    <Button onClick={showproducts} variant="primary">Show Products</Button>{' '}
                </div>
            </div>


            <div>
                <h2 className="px-10 py-10 text-4xl font-extrabold text-red-800">
                    Add or view reviews
                </h2>
                <div className='flex justify-center'>
                    <Button onClick={showreviews} variant="primary">Show Reviews</Button>{' '}
                </div>

            </div>



        </div>
    )
}

export default Admin