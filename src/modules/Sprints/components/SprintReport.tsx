import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import SprintsContext from "../../../context/SprintsContext"
import './report.css'
function SprintReport() {
    const sprintsContext = SprintsContext()
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#de318a'];
    function getStatusOfItems() {
        let result = [
            { status: 1, value: 0 },
            { status: 2, value: 0 },
            { status: 3, value: 0 },
            { status: 4, value: 0 },
        ]
        sprintsContext.targetItem?.userStories.forEach(us => {
            result = result.map(d => {
                const v = us.items.filter(i => i.status === d.status)?.length
                return { ...d, value: d.value + v }
            })
        })
        return result
    }

    function getUserTask() {
        const result = {}
        sprintsContext.targetItem?.userStories.forEach(us => {
            us.items.forEach(i => {
                if (i.user?.username) {
                    result[i.user?.username] = (result[i.user?.username] || 0) + 1
                }
            })
        })
        return Object.keys(result).map(key => {
            return { user: key, value: result[key] }
        }).sort((a, b) => b.value - a.value)
    }

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const totalItems = sprintsContext.targetItem?.userStories?.reduce((p, c) => { return p + c.items?.length }, 0)
    return (
        <div className="sprintReport">
            <div className="reviewSection">
                <div className="reviewCard">
                    تعداد رویداد
                    <div className="amoutField">{sprintsContext.targetItem?.userStories?.length}</div>
                </div>
                <div className="reviewCard">
                    تعداد تسک‌ها
                    <div className="amoutField">{sprintsContext.targetItem?.userStories?.reduce((p, c) => { return p + c.items?.filter(x => x.type === 1)?.length }, 0)}</div>
                </div>
                <div className="reviewCard">
                    تعداد خطاها
                    <div className="amoutField">{sprintsContext.targetItem?.userStories?.reduce((p, c) => { return p + c.items?.filter(x => x.type === 2)?.length }, 0)}</div>
                </div>
            </div>
            <div className="charts">
                <div className="itemStatus">
                    <p><strong>بررسی وضعیت آیتم‌ها</strong></p>
                    <div className="chartWrapper">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={getStatusOfItems()}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {getStatusOfItems().map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="hintMap">
                        <div>
                            <span>
                                <span className="hintColor" style={{ background: COLORS[0] }} /> تعریف شده
                            </span>
                            <span>
                                <span className="hintColor" style={{ background: COLORS[1] }} /> در حال انجام
                            </span>
                        </div>
                        <div>
                            <span>
                                <span className="hintColor" style={{ background: COLORS[2] }} /> در حال بررسی
                            </span>
                            <span>
                                <span className="hintColor" style={{ background: COLORS[3] }} /> انجام شده
                            </span>
                        </div>
                    </div>
                </div>
                <div className="assignTasks">
                    <p className="assignTaskTitle"><strong>آیتم‌ها به تفکیک کابران</strong></p>
                    {getUserTask().map(d => {
                        return <div className="userRow">
                            <span>{d.user}</span>
                            <div className="taskLine" style={{width: ((d.value / totalItems) * 100) + "%"}}>{d.value}</div>
                        </div>
                    })}
                </div>
            </div>

        </div>
    )
}

export default SprintReport