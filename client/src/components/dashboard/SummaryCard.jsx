import Card from "../ui/Card";

function SummaryCard({ title, value, icon: Icon, iconColor = "text-slate-600" }) {
  return (
    <Card className="flex items-center justify-between p-5">
      <div>
        <p className="text-sm text-slate-500">{title}</p>

        <h3 className="mt-2 text-3xl font-bold text-slate-900">
          {value}
        </h3>
      </div>

      {Icon && (
        <div className="rounded-xl bg-slate-100 p-3">
          <Icon className={iconColor} size={24} />
        </div>
      )}
    </Card>
  );
}

export default SummaryCard;