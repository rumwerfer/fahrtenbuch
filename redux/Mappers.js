export const mapJourneysToProps = (state) => {
  const { journeys } = state;
  return { journeys };
};

export const mapVehiclesToProps = (state) => {
  const { vehicles } = state;
  return { vehicles };
}
