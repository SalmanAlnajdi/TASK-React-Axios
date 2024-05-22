import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePet, getOnePet } from "../api/pets";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const PetDetail = () => {
  const { petId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deletePetById } = useMutation({
    mutationKey: ["deletePet", petId],
    mutationFn: () => {
      if (window.confirm("Are you sure 😪??????") == true) {
        return deletePet(petId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getAll"]);
      navigate("/PetList");
    },
  });

  const { data: pet, isLoading } = useQuery({
    queryKey: ["getPet", petId],
    queryFn: () => getOnePet(petId),
  });

  if (isLoading) return <h1>Loading.............</h1>;
  return (
    <div className="bg-[#F9E3BE] w-screen h-[100vh] flex justify-center items-center">
      <div className="border border-black rounded-md w-[70%] h-[70%] overflow-hidden flex flex-col md:flex-row p-5">
        <div className="h-full w-full md:w-[35%]">
          <img
            src={pet.image}
            alt={pet.name}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="w-full md:w-[65%] h-full pt-[30px] flex flex-col p-3">
          <h1>Name: {pet.name}</h1>
          <h1>Type: {pet.type}</h1>
          <h1>adopted: {pet.adopted}</h1>

          <button className="w-[70px] border border-black rounded-md  hover:bg-green-400 mb-5">
            Adobt
          </button>

          <button
            onClick={deletePetById}
            className="w-[70px] border border-black rounded-md  hover:bg-red-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
