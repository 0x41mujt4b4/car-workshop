import React from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const SignupPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
	<div className="col-span-12">
		<div className="overflow-auto lg:overflow-visible ">
			<table className="table text-gray-400 border-separate space-y-6 text-sm">
				<thead className="bg-gray-800 text-gray-500">
					<tr>
						<th className="p-3 text-right">العملية</th>
						<th className="p-3 text-right">الكمية</th>
						<th className="p-3 text-right">السعر</th>
						<th className="p-3 text-right">الحالة</th>
						<th className="p-3 text">الاسبير</th>
					</tr>
				</thead>
				<tbody>
					<tr className="bg-gray-800 text-right">
						<td className="p-3 ">
							<a href="#" className="text-gray-400 hover:text-gray-100 mr-2">
								<i className="text-base"><DeleteOutlinedIcon /></i>
							</a>
							<a href="#" className="text-gray-400 hover:text-gray-100  mx-2">
                                <i className="text-base"><EditOutlinedIcon /></i>
							</a>
							<a href="#" className="text-gray-400 hover:text-gray-100  ml-2">
                            <i className="text-base"><VisibilityOutlinedIcon /></i>
							</a>
						</td>
						<td className="p-3">
							15
						</td>
						<td className="p-3 font-bold">
							200.00$
						</td>
						<td className="p-3">
							<span className="bg-green-400 text-gray-50 rounded-md px-2">متوفر</span>
						</td>
						<td className="p-3">
							<div className="flex align-items-center">
								<div className="ml-3">
									<div className="text-right">أسبير 1</div>
									<div className="text-gray-500">mail@rgmail.com</div>
								</div>
								<img className="rounded-full h-12 w-12  object-cover" src="https://images.unsplash.com/photo-1613588718956-c2e80305bf61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80" alt="unsplash image" />
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
  )
}

export default SignupPage