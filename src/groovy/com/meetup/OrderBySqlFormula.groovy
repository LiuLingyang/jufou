package com.meetup

import org.hibernate.Criteria
import org.hibernate.HibernateException
import org.hibernate.criterion.CriteriaQuery
import org.hibernate.criterion.Order

/**
 * Created with IntelliJ IDEA.
 * User: zjulyy
 * Date: 13-4-12
 * Time: 下午4:26
 * To change this template use File | Settings | File Templates.
 */
class OrderBySqlFormula extends Order {

	private String sqlFormula = null

	protected OrderBySqlFormula(String sqlFormula) {
		super(sqlFormula, true)
		this.sqlFormula = sqlFormula
	}

	public String toString() {
		return this.sqlFormula
	}

	public String toSqlString(Criteria criteria, CriteriaQuery criteriaQuery) throws HibernateException {
		return this.sqlFormula
	}

	/**
	 * Custom order
	 *
	 * @param sqlFormula an SQL formula that will be appended to the resulting SQL query
	 * @return Order
	 */
	public static Order sqlFormula(String sqlFormula) {
		return new OrderBySqlFormula(sqlFormula)
	}

}