import type { SizeChart as SizeChartType } from "@/types";

/** Native <details>: accessible, zero JS. */
export function SizeChart({ chart }: { chart: SizeChartType }) {
  return (
    <details className="group text-sm">
      <summary className="cursor-pointer list-none underline underline-offset-4 hover:text-accent">
        Size chart ({chart.unit === "in" ? "inches" : "cm"})
      </summary>
      <div className="mt-3 overflow-x-auto rounded-md border border-line">
        <table className="w-full text-left text-xs">
          <thead className="bg-subtle">
            <tr>
              {chart.columns.map((col) => (
                <th key={col} scope="col" className="px-3 py-2 font-medium">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chart.rows.map((row) => (
              <tr key={row[0]} className="border-t border-line">
                {row.map((cell, i) =>
                  i === 0 ? (
                    <th key={i} scope="row" className="px-3 py-2 font-medium">
                      {cell}
                    </th>
                  ) : (
                    <td key={i} className="px-3 py-2">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
