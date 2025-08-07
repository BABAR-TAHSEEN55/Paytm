interface SubHeadingProp {
	subheading: string;
}
const SubHeading = ({ subheading }: SubHeadingProp) => {
	return <div className="text-white/50 text-center max-w-sm mx-auto">{subheading}</div>;
};

export default SubHeading;
