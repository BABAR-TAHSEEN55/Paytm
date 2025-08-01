interface SubHeadingProp {
  subheading: string;
}
const SubHeading = ({ subheading }: SubHeadingProp) => {
  return <div className="text-center max-w-sm">{subheading}</div>;
};

export default SubHeading;
