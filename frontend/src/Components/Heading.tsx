interface LabelProp {
  label: string;
}
const Heading = ({ label }: LabelProp) => {
  return (
    <div className="font-mono uppercase text-4xl text-center py-2">{label}</div>
  );
};

export default Heading;
