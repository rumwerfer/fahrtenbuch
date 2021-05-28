export const mapStateToProps = (state) => {
  const { journeys, vehicles } = state;
  return { journeys, vehicles };
}
