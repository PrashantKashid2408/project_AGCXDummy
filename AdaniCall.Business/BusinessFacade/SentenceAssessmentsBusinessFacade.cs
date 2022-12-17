using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AdaniCall.Business.DataAccess.Wrapper;
using AdaniCall.Business.DataAccess.Mapper;
using AdaniCall.Business.DataAccess.DataAccessLayer.General;
using AdaniCall.Business.DataAccess.DataAccessLayer;
using AdaniCall.Entity;
using AdaniCall.Business.DataAccess.Constants;
using AdaniCall.Utility;
using AdaniCall.Entity.Common;
using AdaniCall.Utility.Common;

namespace AdaniCall.Business.BusinessFacade
{
    public class SentenceAssessmentsBusinessFacade//:UniversalObject
    {
        dynamic objdynamicWrapper; 
		SentenceAssessmentsWrapperColletion objSentenceAssessmentsWrapperColletion = new SentenceAssessmentsWrapperColletion();
        SentenceAssessmentsWrapper objSentenceAssessmentsWrapper = new SentenceAssessmentsWrapper();
		private static readonly string _module = "AdaniCall.Business.BusinessFacade.SentenceAssessmentsBusinessFacade";
		public SentenceAssessmentsBusinessFacade()
        {
            
        }
        public SentenceAssessmentsBusinessFacade(dynamic WrapperType)
        {
            objdynamicWrapper = WrapperType; 
        }
        public dynamic GetRecordsList()
        {
            string[,] Sort = new string[1, 2];
            if (objdynamicWrapper.GetRecords(false, Sort))
            {
                return objdynamicWrapper.Items;
            }
            return null;
        }
        public dynamic GetRecordsListByValue(string Field, String Values)
        {
            string[,] Sort = new string[1, 2];

            if (objdynamicWrapper.GetRecords(false, Sort, true, Field, Values))
            {
                return objdynamicWrapper.Items;
            }
            return null;
        }

        public dynamic GetRecordByValue(string Field, string Values)
        {
            string[,] Sort = new string[1, 2];

            if (objdynamicWrapper.GetRecordByValue(Field, Values))
            {
                return objdynamicWrapper.objUsers;
            }
            return null;
        }

        public dynamic GetRecords(int Id)
        {

            if (objdynamicWrapper.GetRecordById(Id))
            {
                return objdynamicWrapper.objWrapperClass;
            }
            return null;
        } 
        public bool Save(dynamic objEntity)
        {
            try
            {
                objSentenceAssessmentsWrapper.objWrapperClass = objEntity;
                DataAccess.DataAccessLayer.DataAccess dalObject = new DataAccess.DataAccessLayer.DataAccess();
                Transaction TransObj = new Transaction(dalObject);
                TransObj.ConnectionString = dbClass.SqlConnectString();
                Dictionary<string, Command> CommandsObj = new Dictionary<string, Command>();
                int commandCounter = 0;

                bool result = objSentenceAssessmentsWrapper.Save(ref CommandsObj, ref commandCounter);
                TransObj.AddCommandList(CommandsObj);
                if (TransObj.ExecuteTransaction())
                {
					long ID = 0;
                    if (long.TryParse(TransObj.ReturnID, out ID) && ID > 0)
                    {
                        objEntity.ID = ID;
                    }
                    return true;
                }
                else
                    return false;
            }
            catch (Exception ex)
            {
                return false;
            }
            finally { }
        }

        public List<SentenceAssessments> GetSentenceAssessments(Int64 LoginID, string ListType, string search = "")
        {
            List<SentenceAssessments> _List = new List<SentenceAssessments>();
            try
            {
                _List = objSentenceAssessmentsWrapperColletion.GetAssessments(LoginID, ListType, search);
            }
            catch (Exception ex)
            {
                Log.WriteLog(_module, "GetSentenceAssessments(LoginID:" + LoginID + ",ListType" + ListType + ",search=" + search + ")", ex.Source, ex.Message, ex);
            }
            return _List;
        }
    }
}
