export default function ItemDetail({ name, value }) {
  return (
    <div className="w-full flex justify-between my-2">
      <span className="font-bold lg:max-w-[150px] flex-1 capitalize block">
        {name}
      </span>
      <p className="ml-5 lg:max-w-[300px] text-right">
        {value || value === 0 ? value : "null"}
      </p>
    </div>
  );
}
