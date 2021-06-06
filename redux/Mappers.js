export const mapStateToProps = (state) => {
  const { journeys, vehicles, tutors } = state;
  return { journeys, vehicles, tutors };
}
