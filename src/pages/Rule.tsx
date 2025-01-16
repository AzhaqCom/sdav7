

export function Rule() {
    return (
        <div className="bg-white dark:bg-gray-800  p-6 rounded-lg shadow">

            <div className="border-b border-gray-200">
                <h2 className=" dark:text-white text-lg font-bold mb-4">Documents PDF</h2>
                <ul className="list-disc pl-6">
                    <li>
                        <a
                            href="src/pdf/rules.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dark:text-white hover:underline"
                        >
                            Rule
                        </a>
                    </li>
                    <li>
                        <a
                            href="src/pdf/army-hobbit.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dark:text-white hover:underline"
                        >
                            Hobbit
                        </a>
                    </li>
                    <li>
                        <a
                            href="src/pdf/army-me.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dark:text-white hover:underline"
                        >
                            SDA
                        </a>
                    </li>
                </ul>
            </div>

        </div>
    );
}
