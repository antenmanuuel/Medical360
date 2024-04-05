import React from 'react'
import { useState } from 'react';
import Banner from '../components/Banner';
import FormField from '../components/FormField';
import AuthContext from '../auth/AuthContext';
import { useContext } from 'react';
import SearchBar from '../components/SearchBar';

function AllEquipmentPage() {

    const { auth } = useContext(AuthContext);

    return (
        <>
            <Banner goBackPath={"/"}></Banner>
            <div className="flex justify-center">
                <div className="text-blue-500 p-4 m-4 rounded-lg text-3xl">
                    All Equipment
                </div>
            </div>
            <SearchBar></SearchBar>

            {
                // table or map of equipment cards should go here
            }
        </>
    )
}

export default AllEquipmentPage