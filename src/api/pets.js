import instance from ".";

const getAllPets = async () => {
  const response = await instance.get("/pets");
  return response.data;
};

const getOnePet = async (id) => {
  const response = await instance.get(`/pets/${id}`);
  return response.data;
};

export { getAllPets, getOnePet };
